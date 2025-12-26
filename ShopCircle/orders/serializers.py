from rest_framework import serializers
from .models import Cart, CartItem, Order, OrderItem
from products.serializers import ProductSerializer

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    
    class Meta:
        model = CartItem
        fields = ['id','product','quantity']
        

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True,read_only=True)
    
    class Meta:
        model = Cart
        fields = ['id','items']
        

class OrderItemSerializer(serializers.Serializer):
    product = ProductSerializer(read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['product','quantity','price']
    

class OrderSerializer(serializers.Serializer):
    items = OrderItemSerializer(many=True,read_only=True)
    
    class Meta:
        model = Order
        fields = ['id','total_price','status','created_at','items']