class AddNameToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :name, :string, default: '', optional: false
    add_column :users, :username, :string, default: '', optional: true
    add_column :users, :location, :string, default: '', optional: true
    add_column :users, :about, :string, default: '', optional: true
    add_column :users, :email, :string, default: '', optional: true
    add_column :users, :password, :string, default: '', optional: true
    add_column :users, :password_digest, :string, default: '', optional: true
    add_column :users, :photo, :string, default: '', optional: true
    add_column :users, :provider, :string, default: '', optional: true
    add_column :users, :uid, :string, default: '', optional: true
    add_column :users, :created, :boolean, default: false, optional: true
  end
end
