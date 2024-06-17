from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from StudentApp.serializers import StudentSerializer
from StudentApp.models import Student
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


@csrf_exempt
def studentApi(request,id=0):
    if request.method=='GET':
        student = Student.objects.all()
        student_serializer=StudentSerializer(student,many=True)
        return JsonResponse(student_serializer.data,safe=False)
    elif request.method=='POST':
        student_data=JSONParser().parse(request)
        student_serializer=StudentSerializer(data=student_data)
        if student_serializer.is_valid():
            student_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    
    elif request.method=='DELETE':
        student=Student.objects.get(id=id)
        student.delete()
        return JsonResponse("Deleted Successfully",safe=False)


class DeleteStudentView(APIView):
    def delete(self, request, pk):
        try:
            student = Student.objects.get(id=pk)
            student.delete()
            return Response("Deleted Successfully")
        except Exception as e:
            return Response("Student not found", status=status.HTTP_404_NOT_FOUND)


class UpdateStudentView(APIView):
    def put(self, request, pk):
        try:
            student = Student.objects.get(id=pk)
            student_serializer = StudentSerializer(student, data=request.data)
            if student_serializer.is_valid():
                student_serializer.save()
            return Response("Updated Successfully")
        except Exception as e:
            return Response({"message":"Failed to update", "error":str(e)}, status=status.HTTP_404_NOT_FOUND)




















#in postman
#http://127.0.0.1:8000/api/deleteStudent/13/.....for delete
#http://127.0.0.1:8000/api/student/......for get




