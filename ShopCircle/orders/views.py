from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Cart,CartItem, Order, OrderItem
from products.models import Product
from .serializers import CartSerializer

# Create your views here.


def get_cart():
    cart,created = Cart.objects.get_or_create(id=1)
    return cart


@api_view(['GET'])
def cart_detail(request):
    cart = get_cart()
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
def add_to_cart(request):
    cart = get_cart()
    product_id = request.data.get('product_id')
    product = Product.objects.get(id=product_id)
    
    item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product
    )

    if not created:
        item.quantity += 1
    item.save()

    return Response({"message": "Product added to cart"})


@api_view(['POST'])
def update_quantity(request):
    item_id = request.data.get('item_id')
    quantity = request.data.get('quantity')

    item = CartItem.objects.get(id=item_id)
    item.quantity = quantity
    item.save()

    return Response({"message": "Quantity updated"})



@api_view(['POST'])
def checkout(request):
    cart = get_cart()
    items = cart.items.all()
    
    if not items:
        return Response({'error':"Cart is empty"},status=400)
    
    total = 0
    for item in items:
        total += item.product.price * item.quantity
    
    order = Order.objects.create(total_price=total)
    
    for item in items:
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity
            price=item.product.price
        )
        
    items.delete()

    return Response({
        "message":"Order placed Successfully",
        "order_id": order.id
    })