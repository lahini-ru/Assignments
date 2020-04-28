package com.assignment.trackpocket.trackpocketmodel.Category;

public class CategoryResponse {
    private int id;
    private String categoryName;
    private AddBy addBy;

    public CategoryResponse(int id, String categoryName, AddBy addBy) {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public AddBy getAddBy() {
        return addBy;
    }

    public void setAddBy(AddBy addBy) {
        this.addBy = addBy;
    }
}

