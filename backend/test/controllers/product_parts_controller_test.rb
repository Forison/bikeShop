# frozen_string_literal: true

require 'test_helper'

class ProductPartsControllerTest < ActionDispatch::IntegrationTest
  test 'should get create' do
    get product_parts_create_url
    assert_response :success
  end

  test 'should get show' do
    get product_parts_show_url
    assert_response :success
  end
end
