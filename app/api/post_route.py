from app.models import db,Post,Comment,User,Like,PostImage
from flask import Blueprint, jsonify,request
from flask_login import login_required, current_user
from app.forms import PostForm,CommentForm,PostUpdate
from app.api.aws_helper import upload_file_to_s3, get_unique_filename,remove_file_from_s3


post_routes = Blueprint('posts', __name__)


## GET ALL COMMENTS
@post_routes.route('/<int:id>/comments')
def all_comments(id):
    '''
        Get all comments for a post in the database
    '''
    comments = [x.to_dict() for x in Comment.query.filter_by(post_id=id).all()]
    for comment in comments:
        author = User.query.filter_by(id=comment['ownerId']).first()
        comment['author'] = author.username
    return {"Comments":comments}


## GET ONE POST BY ITS ID
@post_routes.route('/<int:id>')
def one_post(id):
    '''
        Get one post in the database by the id
    '''
    post = Post.query.filter_by(id=id).first()
    if post == None:
        return {"message":"Post could not be found"}, 404
    postObj = post.to_dict()
    postObj['images'] = [x.to_dict() for x in PostImage.query.filter_by(postId = id).all()]
    author = User.query.filter_by(id = post.user_id).first()
    postObj['author'] = author.username
    postObj['Comments'] = [x.to_dict() for x in Comment.query.filter_by(post_id = post.id).all()]
    for comment in postObj['Comments']:
        user = User.query.filter_by(id = comment['ownerId']).first()
        comment['author'] = user.to_dict()
    return {"Post":postObj}

##
@post_routes.route('/')
def all_posts():
    posts = [x.to_dict() for x in Post.query.all()]
    for post in posts:
        post['images'] = [x.to_dict() for x in PostImage.query.filter_by(postId=post['id']).all()]
        author = User.query.filter_by(id=post['ownerId']).first()
        post['author'] = author.username
        comments = [x.to_dict() for x in Comment.query.filter_by(post_id=post['id']).all()]
        post['Comments'] = []
        for comment in comments:
            user = User.query.filter_by(id=comment['ownerId']).first()
            comment['author'] = user.to_dict()
            post['Comments'].append(comment)
    return {"Posts": posts}


@post_routes.route('/', methods=['POST'])
@login_required
def make_post():
    '''
        If logged in and the data is valid,
        create a new post and add it to the database
    '''
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = Post(
            title = form.data["title"],
            body = form.data["body"],
            user_id = current_user.id
        )
        db.session.add(new_post)
        db.session.commit()
        safe_post = new_post.to_dict()
        safe_post['author'] = current_user.username
        return {"Post":safe_post}
    if form.errors:
        print(form.errors)
        return {"message":"Bad Request", "errors":form.errors}, 400


@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_post(id):
    '''
        If logged in and the owner of the post
        updates the question, it saves to the
        database
    '''
    post = Post.query.filter_by(id=id).first()
    if post.user_id != current_user.id:
        return {"message":"Not the owner of this Post"},401
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post.title = form.data["title"]
        post.body = form.data["body"]
        db.session.commit()
        safe_post = post.to_dict()
        safe_post['images'] = [x.to_dict() for x in PostImage.query.filter_by(postId = id).all()]
        safe_post['author'] = current_user.username
        safe_post['Comments']= [x.to_dict() for x in Comment.query.filter_by(post_id = id).all()]
        return {"Post":safe_post}
    if form.errors:
        return {"message":"Bad Request", "errors":form.errors}, 400


@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    '''
        If logged in and the owner of the
        post, delete the post from the
        database if it exists
    '''
    post = Post.query.filter_by(id=id).first()
    if current_user.id == post.user_id:
        db.session.delete(post)
        db.session.commit()
        return {"id":id}
    else:
        return {"id":None}, 404

@post_routes.route('/<int:id>/comments', methods=["POST"])
@login_required
def make_comment(id):
    '''
        If user is logged in, make a new comment for a
        post and add it to the database
    '''
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment=Comment(
            body=form.data['body'],
            post_id=id,
            user_id=current_user.id,
            is_primary=False
        )
        db.session.add(new_comment)
        db.session.commit()
        safe_comment = new_comment.to_dict()
        x_post = Post.query.filter_by(id=id).first()
        post = x_post.to_dict()
        owner = User.query.filter_by(id= post['ownerId']).first()
        post['owner'] = owner.to_dict()
        safe_comment['mainPost'] = post
        return {"Comment":safe_comment}
    if form.errors:
        print(form.errors)
        return {"message":"Bad Request", "errors":form.errors}, 400


@post_routes.route('/<int:id>/likes', methods = ['POST'])
@login_required
def create_like(id):
    '''
        like the post
    '''
    x_post = Post.query.filter_by(id=id).first()
    if x_post != None:
        new_like = Like(
            post_id = id,
            user_id = current_user.id
        )
        db.session.add(new_like)
        db.session.commit()
        safe_like = new_like.to_dict()
        post = x_post.to_dict()
        author = User.query.filter_by(id = post['ownerId']).first()
        post['author'] = author.username
        safe_like['post'] = post
        return {'Like':safe_like}
    else:
        return {'message':"Post could not be found"}, 404


@post_routes.route('/like/<int:id>', methods=['DELETE'])
@login_required
def unlike_post(id):
    print("Received unlike request for id:", id)
    like = Like.query.filter_by(id=id).first()
    if like:
        db.session.delete(like)
        db.session.commit()
        return {'Id': id}
    else:
        return {'message': "Like not found"}, 404
