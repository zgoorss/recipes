module ActiveRecordErrorsRescue
  extend ActiveSupport::Concern

  ERROR_MESSAGES = {
    record_not_found: "Record not found",
    record_invalid: "Invalid record"
  }.freeze

  included do
    rescue_from ActiveRecord::RecordNotFound do |error|
      render json: {
        title: ERROR_MESSAGES.fetch(:record_not_found),
        error: error
      }, status: :not_found
    end

    rescue_from ActiveRecord::RecordInvalid do |error|
      render json: {
        title: ERROR_MESSAGES.fetch(:record_invalid),
        error: error,
        detail: error.message
      }, status: :unprocessable_entity
    end
  end
end
