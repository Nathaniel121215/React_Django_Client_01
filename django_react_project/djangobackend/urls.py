
from django.contrib import admin
from django.urls import path, include
from djangoback import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'items', views.ItemViewSet, 'items')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('api/', include(router.urls)),
    path('api/items/<int:pk>/', views.item_detail, name='item-detail'),
]
