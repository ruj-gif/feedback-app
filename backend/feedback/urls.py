from django.urls import path
from .views import feedback_list_create, feedback_update_delete

urlpatterns = [
    path('feedback/', feedback_list_create),
    path('feedback/<int:pk>/', feedback_update_delete),
]

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('feedback.urls')),
]