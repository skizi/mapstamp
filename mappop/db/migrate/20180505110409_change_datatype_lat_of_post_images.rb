class ChangeDatatypeLatOfPostImages < ActiveRecord::Migration[5.1]
  def change
  	change_column :post_images, :lat, :float
  	change_column :post_images, :lng, :float
  end
end
