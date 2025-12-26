from rest_framework import serializers
from .models import Cart, CartItem
from products.serializers import ProductSerializer

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    
    class Meta:
        model = CartItem
        fields = ['id','product','quentity']
        

class CartSerializer(serializers.ModelSerializer):
    item = CartItemSerializer(many=True)
    
    class Meta:
        model = Cart
        fields = ['id','item']
        
        
