class CreateDays < ActiveRecord::Migration[5.0]
  def change
    create_table :days do |t|
    	t.string :emotion
    	t.integer :user_id

      t.timestamps
    end
  end
end
