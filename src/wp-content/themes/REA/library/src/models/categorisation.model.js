class Categorisation {
  constructor(categories, primaryCategories, secondaryCategories) {
    let c = new Set(categories);
    let p = new Set(primaryCategories);
    let s = new Set(secondaryCategories);

    let primaryIntersection = [...p].filter(
      category => c.has(category)
    );
    let secondaryIntersection = [...s].filter(
      category => c.has(category)
    );

    this.primaryCategoryName = primaryIntersection[0];
    this.secondaryCategoryName = secondaryIntersection[0];
  }

  primaryCategory() {
    return this.primaryCategoryName;
  }

  secondaryCategory() {
    return this.secondaryCategoryName;
  }
}

export default Categorisation;
