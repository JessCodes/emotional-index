class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
    	t.string :email
    	t.string :phone
    	t.boolean :push?
    	t.boolean :text?

      t.timestamps
    end
  end
end
