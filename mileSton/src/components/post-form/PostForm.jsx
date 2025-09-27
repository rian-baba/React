import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/Configure";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        console.log("Submit function called");
        console.log("Form data:", data);
        console.log("Image data:", data.image);
        console.log("Image file:", data.image[0]);
        
        try {
            if (post) {
                console.log("Updating existing post");
                // Update existing post logic
                let file = null;
                
                if (data.image[0]) {
                    console.log("Uploading new image...");
                    console.log("File details:", {
                        name: data.image[0].name,
                        size: data.image[0].size,
                        type: data.image[0].type
                    });
                    
                    file = await appwriteService.uploadFile(data.image[0]);
                    console.log("Upload result:", file);
                    
                    if (file && post.featuredImage) {
                        console.log("Deleting old image:", post.featuredImage);
                        await appwriteService.deleteFile(post.featuredImage);
                    }
                }

                const updateData = {
                    title: data.title,
                    content: data.content,
                    status: data.status,
                    ...(file && { featuredImage: file.$id })
                };
                
                console.log("Update data:", updateData);
                
                const dbPost = await appwriteService.updatePost(post.$id, updateData);
                console.log("Updated post:", dbPost);

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                console.log("Creating new post");
                
                // Check if image is selected
                if (!data.image || !data.image[0]) {
                    console.error("No image selected");
                    alert("Please select an image for your blog post");
                    return;
                }
                
                console.log("Selected file details:", {
                    name: data.image[0].name,
                    size: data.image[0].size,
                    type: data.image[0].type,
                    lastModified: data.image[0].lastModified
                });
                
                // Upload file
                console.log("Starting file upload...");
                const file = await appwriteService.uploadFile(data.image[0]);
                console.log("Upload response:", file);

                if (file && file.$id) {
                    console.log("File uploaded successfully, ID:", file.$id);
                    
                    const postData = {
                        title: data.title,
                        slug: data.slug,
                        content: data.content,
                        featuredImage: file.$id,
                        status: data.status,
                        userId: userData.$id
                    };
                    
                    console.log("Creating post with data:", postData);
                    
                    const dbPost = await appwriteService.createPost(postData);
                    console.log("Created post:", dbPost);

                    if (dbPost) {
                        console.log("Post created successfully, navigating to:", `/post/${dbPost.$id}`);
                        navigate(`/post/${dbPost.$id}`);
                    } else {
                        console.error("Failed to create post in database");
                        alert("Failed to create post. Please try again.");
                    }
                } else {
                    console.error("File upload failed:", file);
                    alert("Failed to upload image. Please try again.");
                }
            }
        } catch (error) {
            console.error("Error in submit function:", error);
            alert(`Error: ${error.message || 'Something went wrong'}`);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    // File input change handler for debugging
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log("File selected:", file);
        if (file) {
            console.log("File details:", {
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: new Date(file.lastModified)
            });
            
            // Check file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                alert("File size too large. Please select a file smaller than 5MB.");
                e.target.value = '';
                return;
            }
            
            // Check file type
            const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                alert("Invalid file type. Please select PNG, JPG, JPEG, or GIF.");
                e.target.value = '';
                return;
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                    onChange={(e) => {
                        handleFileChange(e);
                        // Call the original register onChange
                        const { onChange } = register("image", { required: !post });
                        onChange(e);
                    }}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Controller
                    name="status"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            options={["active", "inactive"]}
                            label="Status"
                            className="mb-4"
                            value={field.value}
                            onChange={(val) => field.onChange(val.target.value)}
                        />
                    )}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}