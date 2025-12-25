from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('categories/', views.category_list,name='categories'),
    path('products/', views.category_list,name='products'),
    path('products/<int:pk>', views.category_list,name='Product_detail'),
]
