from rest_framework import serializers
from .models import Feedback

class FeedbackSerializer(serializers.ModelSerializer):
    display_name = serializers.SerializerMethodField()

    class Meta:
        model = Feedback
        fields = '__all__'

    def get_display_name(self, obj):
        return "Anonymous" if obj.is_anonymous else obj.name