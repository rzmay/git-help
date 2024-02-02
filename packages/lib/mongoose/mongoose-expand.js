const { InvalidRequestError } = require('../helpers/Error');

module.exports = function mongooseExpand(schema) {
  const paths = Object.entries(schema.paths)
    .filter(([, { options, caster }]) => options.expandable || caster?.options?.expandable)
    .map(([path]) => path);

  schema.pre(['find', 'findById', 'findOne'], function () {
    const { expand } = this.getQuery();
    if (expand === undefined) return;

    if (!Array.isArray(expand)) throw new InvalidRequestError({
      param: 'expand',
      message: 'Invalid array',
    });

    expand.forEach((path) => {
      if (!paths.includes(path)) throw new InvalidRequestError({
        message: `This property cannot be expanded (${path}).`,
      });
    });

    this.populate(expand);
    this.setQuery({ ...this.getQuery(), expand: undefined });
  });
};
