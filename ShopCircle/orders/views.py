from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .models import Cart,CartItem, Order, OrderItem
from products.models import Product
from .serializers import CartSerializer, OrderSerializer
from rest_framework.permissions import IsAuthenticated


# Create your views here.


def get_cart(user):
    cart,created = Cart.objects.get_or_create(user=user)
    return cart


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cart_detail(request):
    cart = get_cart(request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    cart = get_cart(request.user)
    product_id = request.data.get('product_id')
    
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"})
    
    item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product
    )

    if not created:
        item.quantity += 1
    item.save()

    return Response({"message": "Product added to cart"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_quantity(request):
    item_id = request.data.get('item_id')
    quantity = request.data.get('quantity')

    item = CartItem.objects.get(id=item_id, cart__user=request.user)
    
    if quantity <=0:
        item.delete()
    else:
        item.quantity = quantity
        item.save()

    return Response({"message": "Quantity updated"})



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def delete_cart_item(request):
    item_id = request.data.get("item_id")

    if not item_id:
        return Response({"error": "item_id is required"})

    try:
        item = CartItem.objects.get(id=item_id)
        item.delete()
        return Response({"message": "Item removed from cart"})

    except CartItem.DoesNotExist:
        return Response({"error": "Item not found"})



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def checkout(request):
    cart = get_cart(request.user)
    items = cart.items.all()
    
    if not items:
        return Response({'error':"Cart is empty"},status=400)
    
    total = sum(item.product.price * item.quantity for item in items)
    
    order = Order.objects.create(user=request.user, total_price=total)
    
    for item in items:
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price,
        )
        
    items.delete()

    return Response({
        "message":"Order placed Successfully",
        "order_id": order.id,
    })
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_orders(request):
    orders = Order.objects.filter(user=request.user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)