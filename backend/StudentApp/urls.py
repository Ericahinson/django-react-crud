from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('students/', studentApi),
    path('deleteStudent/<int:pk>/', DeleteStudentView.as_view()),
path('UpdateStudentView/<int:pk>/', UpdateStudentView.as_view())

]