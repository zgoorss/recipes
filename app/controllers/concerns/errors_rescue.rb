module ErrorsRescue
  extend ActiveSupport::Concern

  ERROR_MESSAGES = {
    bad_request: "Bad request"
  }.freeze

  included do
    rescue_from ActionController::ParameterMissing do |error|
      render json: {
        title: ERROR_MESSAGES.fetch(:bad_request),
        error: error
      }, status: :bad_request
    end
  end
end
