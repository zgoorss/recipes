class ApplicationController < ActionController::Base
  include Pagy::Backend
  include ::ErrorsRescue
  include ::ActiveRecordErrorsRescue
end
