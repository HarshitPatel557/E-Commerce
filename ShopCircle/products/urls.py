from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.category_list,name='categories'),
    path('products/', views.product_list,name='products'),
    path('product/<int:pk>', views.product_detail,name='product_detail'),
]
