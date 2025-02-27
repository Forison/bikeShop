# frozen_string_literal: true

module Api
  module V1
    class Order < ApplicationRecord
      belongs_to :user

      belongs_to :user
      has_many :order_items, dependent: :destroy

      enum status: { pending: 'pending', paid: 'paid', shipped: 'shipped', cancelled: 'cancelled' }

      validates :total, numericality: { greater_than_or_equal_to: 0 }

      def mark_as_paid
        update(status: 'paid')
      end
    end
  end
end
