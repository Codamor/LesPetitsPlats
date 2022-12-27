# Les Petits Plats

![Les Petits Plats](LesPetitsPlats_capture.png "Les Petits Plats")

## Table of contents

- [Context](#context)
- [Demonstration](#demonstration)
- [What this project allow me to practive](#what-this-project-allowed-me-to-practice)
  - [Skills](#skills)
  - [Algorithm](#algorithm)
- [Technologies / Methods](#technologies--methods)
- [Expected deliverables](#expected-deliverables)
  - [Nominal scenario](#nominal-scenario)
  - [Alternative scenario A1](#alternative-scenario-a1)
  - [Alternative scenario A2](#alternative-scenario-a2)
  - [Alternative scenario A3](#alternative-scenario-a3)
- [Resources](#resources)
- [Compatibility](#compatibility)


## Context

**Les Petits Plats** is a cooking recipe site like Marmiton or 750g.
It offers a search engine for recipes.

## Demonstration

**Les Petits Plats** is visible on https://codamor.github.io/LesPetitsPlats/


## What this project allowed me to practice

### Skills

* cut and integrate a model,
* structure a web page with HTML5,
* format a web page with CSS3,
* manipulate the DOM,
* listen to events,
* generate content dynamically from a JSON file,
* make the site accessible,
* implement a pattern search algorithm.

### Algorithm

```

Begin
   patLen := pattern Size
   strLen := string size

   for i := 0 to (strLen - patLen), do
      for j := 0 to patLen, do
         if text[i+j] ≠ pattern[j], then
            break the loop
      done

      if j == patLen, then
         display the position i, as there pattern found
   done
End
```



### Technologies / methods

* HTML5/CSS3,
* positioning with Grid and FlexBox,
* responsive design with media queries,
* BEM naming convention,
* Fetch/Json,
* CSS with Sass,
* WCAG 2.0 repository.

## Expected deliverables

### Nominal scenario

* The use case starts when the user enters at least 3 characters in the main search bar,
* the system searches for recipes matching the user input in: the recipe title, the list of recipe ingredients, the recipe description,
* the interface is updated with search results,
* the advanced search fields are updated with the ingredient, utensil and appliance information for the various remaining recipes,
* the user specifies his search using one of the fields: ingredients, utensils, appliance,
* as you fill in the keywords that do not correspond to the keystroke in the field disappear,
* the user chooses a keyword in the field,
* the keyword appears as a tag under the main search,
* the search results are updated, as well as the elements available in the advanced search fields,
* the user selects a recipe.

### Alternative scenario A1

* No recipe matching the search,
* sequence A1 starts at point 3 of the nominal scenario,
* the interface displays "No recipe matches your criteria... you can search for "apple pie", "fish", etc.

### Alternative scenario A2

* The user begins his search with a tag,
* sequence A2 begins at point 1 of the nominal scenario and resumes at point 9 of the nominal scenario,
* the user begins the search with a tag.
* the search results are updated, as well as the elements available in the advanced search fields (9 of the main case).

### Alternative scenario A3

* User adds other tags for advanced search,
* sequence A3 begins at point 9 of the nominal scenario. This sequence can be repeated as often as necessary,
* the user specifies his search using one of the fields: ingredients, utensils, appliance,
* as you fill in the keywords that do not correspond to the keystroke in the field disappear,
* the user chooses a keyword in the field,
* the keyword appears as a tag under the main search,
* the search results are updated, as well as the elements available in the advanced search fields.

## Resources
I have the following items:
* desktop model,
* Json data file.


## Compatibility

  * valid to **W3C** standards,
  * compatible with the latest versions of **Chrome** and **Firefox**



