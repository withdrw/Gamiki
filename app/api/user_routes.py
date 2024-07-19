from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Comment, Post , Like

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/comments')
@login_required
def get_my_comments():
    '''
        Get all of the current logged in
        user's comments to posts
    '''
    comments = [x.to_dict() for x in Comment.query.filter_by(user_id=current_user.id).all()]
    for comment in comments:
        main = Post.query.filter_by(id = comment['mainPost']).first()
        post = main.to_dict()
        owner = User.query.filter_by(id= post['ownerId']).first()
        post['owner'] = owner.to_dict()
        comment['mainPost'] = post
    return {"Comments": comments}

@user_routes.route('/likes')
@login_required
def get_user_likes():
    '''
        Get all of the current logged in
        user's liked posts
    '''
    likes = [x.to_dict() for x in Like.query.filter_by(user_id=current_user.id).all()]
    for x in likes:
        x_post = Post.query.filter_by(id=x['post']).first()
        post = x_post.to_dict()
        author = User.query.filter_by(id = post['ownerId']).first()
        post['author'] = author.username
        post['Comments'] = [x.to_dict() for x in Comment.query.filter_by(post_id = post['id']).all()]
        if x_post!= None:
            x['post'] = post
    return {"Liked Posts": likes}
