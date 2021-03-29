require 'test_helper'

class PostTest < ActiveSupport::TestCase
  test "requires all fields" do
    assert_raises(ActiveRecord::RecordInvalid) do
      p=Post.create()
      p.save!
    end
  end
end
