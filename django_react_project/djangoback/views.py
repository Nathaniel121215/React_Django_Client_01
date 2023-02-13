from django.shortcuts import render
from rest_framework import viewsets
from .models import Item
from .serializers import ItemSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

def index(request):
    return render(request, 'index.html')


def item_detail(request, pk):
    item = get_object_or_404(Item, pk=pk)
    return Response(item.data)