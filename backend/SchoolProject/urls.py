from django.contrib import admin
# from django.urls import path
# from django.conf.urls import url
# from StudentApp import views
# from form_handler import views
from django.urls import path, include



urlpatterns = [
    # url(r'^student$',views.studentApi),
    # url(r'^student$',views.studentApi),
    # url(r'^student/([0-9]+)$',views.studentApi),
    path('admin/', admin.site.urls),
    # path('http://127.0.0.1:8000/student', views.submit_form, name='student'),
    # path('', include('http://localhost:5173/students')),
    path('api/', include('StudentApp.urls'))



]