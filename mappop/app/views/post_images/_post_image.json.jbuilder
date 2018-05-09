json.extract! postImage, :user_id, :title, :image_type, :view_count, :lat, :lng, :content , :id

json.url post_image_url(postImage, format: :json)
