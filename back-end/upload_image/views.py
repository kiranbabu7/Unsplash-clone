from rest_framework.views import APIView
from rest_framework.response import Response

from upload_image.models import Images
# Create your views here.

class UploadImageView(APIView):

    def get(self, request):
        label = request.GET.get('label', '').lower()
        if label:
            latest_images = Images.objects.filter(label=label).order_by('-id')[:20].values()
        else:
            latest_images = Images.objects.all().order_by('-id')[:20].values()

        return Response({
            'status': True,
            'data': latest_images,
            'message': 'Successful'
        })

    def post(self, request):
        
        data = request.data

        Images.objects.create(
            label= data['label'],
            url = data['image_url']
        )

        return Response(
            {
                'status': True,
                'message': 'Image uploaded Successfully.'
            }
        )

    def delete(self, request):
        image_id = request.GET.get('id', '')
        image_object = Images.objects.get(id=image_id)
        if image_object:
            image_object.delete()

        return Response(
            {
                'status': True,
                'message': 'Image deleted Successfully!'
            }
        )