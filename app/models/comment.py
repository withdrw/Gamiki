from .db import db, environment, SCHEMA,add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(2000), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    is_primary = db.Column(db.Boolean, nullable=False)
    time_created = db.Column(db.DateTime(timezone=True), server_default=db.func.now())


    user = db.relationship('User', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'is_primary': self.is_primary,
            'mainPost': self.post_id,
            'ownerId': self.user_id,
            'timeCreated': self.time_created,
            'author': self.user.username,
        }
