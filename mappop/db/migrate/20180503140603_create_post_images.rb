class CreatePostImages < ActiveRecord::Migration[5.1]
  def change
    create_table :post_images do |t|
      t.integer :user_id, default: -1
      t.string :title, default: ''
      t.string :image_type, default: ''
      t.string :content, default: ''
      t.integer :view_count, default: 0
      t.integer :lat, default: 0
      t.integer :lng, default: 0
      t.timestamps
    end
  end
end
