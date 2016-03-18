class AddColumnsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :rating, :real, default: 0
    add_column :users, :avatar_url, :string
  end
end
