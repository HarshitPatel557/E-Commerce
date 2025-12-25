from rest_framework import serializers
from .models import Product,Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name','slug']
        
        
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = Product
        field = [
            'id','name','description','price','image_url','category','created_at',
        ]