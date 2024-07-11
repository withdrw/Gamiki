from app.models import db,Post
from flask import Blueprint, jsonify,request
from flasklogin import loginrequired, current_user
from app.forms import PostForm
post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def all_post():
    posts = [x.to_dict() for x in Post.query.all()]
    (for post in posts):
