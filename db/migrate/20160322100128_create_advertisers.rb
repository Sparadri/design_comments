class CreateAdvertisers < ActiveRecord::Migration
  def change
    create_table :advertisers do |t|
      t.string :name
      t.string :avatar_url
      t.timestamps null: false
    end
  end
end
