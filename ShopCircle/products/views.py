from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,APIView
from .models import Product,Category
from .serializers import CategorySerializer,ProductSerializer
# Create your views here.


def category_list(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories,many=True)
    return Response(serializer.data)

def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products,many=True)
    return Response(serializer.data)

def product_detail(request,pk):
    product = Product.objects.get(pk=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)