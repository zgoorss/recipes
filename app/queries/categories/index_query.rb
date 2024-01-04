module Categories
  class IndexQuery
    def initialize(params)
      @title = params[:title]
    end

    def call
      Category
        .all
        .then { filter_by_title(_1) }
        .order(title: :asc)
    end

    private

    attr_reader :title

    def filter_by_title(scope)
      return scope if title.blank?

      scope.where("lower(title) ILIKE ?", "%#{title}%")
    end
  end
end
