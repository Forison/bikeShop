# frozen_string_literal: true

module Api
  module V1
    class ReduceProductQuantityService
      MAX_RETRIES = 3
      def initialize(product)
        @product = product
      end

      def call
        retries = 0
        begin
          ActiveRecord::Base.transaction(isolation: :serializable) do
            lock_and_reduce_quantity
          end
        rescue ActiveRecord::Deadlocked
          retries += 1
          retry if retries < MAX_RETRIES
          raise 'Transaction failed due to a deadlock'
        end
      end

      private

      def lock_and_reduce_quantity
        @product.lock!
        raise ActiveRecord::RecordInvalid, 'Product is out of stock' unless @product.quantity.positive?

        @product.quantity -= 1
        @product.save!
      end
    end
  end
end
