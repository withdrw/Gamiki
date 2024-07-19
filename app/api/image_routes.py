from app.models import  User, db, Post, PostImage
from app.api.aws_helper import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import ImageForm

image_routes = Blueprint('images', __name__)

@image_routes.route('/<int:id>', methods=['POST'])
@login_required
def upload_photo(id):
     '''
        Add one photo to the database,
        assigned to the post id.
    '''
     post = Post.query.get(id)
     print("ID IN BACK: ", id)

     if not post:
          return{
               'message': 'post with this id could not be found'
          }, 404
     elif post.user_id != current_user.id:
          return{
               'message': 'you are not the owner of this post'
          }, 403

     form = ImageForm()
     form['csrf_token'].data = request.cookies['csrf_token']

     if form.validate_on_submit():
          image = form.data['image']
          image.filename = get_unique_filename(image.filename)
          upload = upload_file_to_s3(image)

          if "url" not in upload:
          # if the dictionary doesn't have a url key
          # it means that there was an error when you tried to upload
          # so you send back that error message (and you printed it above)
               return{
                    'message':'Cannot upload', 'errors':[upload]
               }, 400

     ################ Delete the old image from S3 if exists
          if post.images and len(post.images) > 0:
               old_image = post.images[0]
               remove_file_from_s3(old_image.imageUrl)
               db.session.delete(old_image)
               db.session.commit()
     ###############################################

          url = upload['url']
          new_image = PostImage(
               imageUrl = url,
               postId = id
          )
          db.session.add(new_image)
          db.session.commit()
          return {
            'image': new_image.to_dict()
          }, 201

     if form.errors:
          return{
               "message":"Bad Request", "errors":form.errors
          }, 400

@image_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_photo(id):
    '''
        Delete an image from the database
        assigned to the post id
    '''
    image = PostImage.query.get(id)

    if not image:
         return {
              'message':'Image could not be found'
         }, 404
    post = Post.query.get(image.postId)

    if post.ownerId != current_user.id:
         return{
              'message':'You must be the owner to delete photo'
         }, 403

    db.session.delete(image)
    db.session.commit()

    safe_post = post.to_dict()
    safe_post['images'] = [x.to_dict() for x in PostImage.query.filter_by(postId = post.id).all()]
    user = User.query.get(post.ownerId)
    safe_post['owner'] = user.to_dict()
    return{
         'post': safe_post
    }
