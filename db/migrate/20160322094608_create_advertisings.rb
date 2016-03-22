class CreateAdvertisings < ActiveRecord::Migration
  def change
    create_table :advertisings do |t|
      t.string :title
      t.string :like_count, :integer, default: 0
      t.string :picture
      t.references :advertiser
      t.timestamps null: false
    end
  end
end





