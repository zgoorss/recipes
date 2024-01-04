module Categories
  class IndexQuery
    def initialize(params)
      @value = params[:value]
    end

    def call
      Category
        .all
        .then { filter_by_value(_1) }
        .order(title: :asc)
    end

    private

    attr_reader :value

    def filter_by_value(scope)
      return scope if value.blank?

      scope.where("lower(title) ILIKE ?", "%#{value}%")
    end
  end
end
