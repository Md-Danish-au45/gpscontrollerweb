import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Trash2, 
  X, 
  Edit, 
  Eye, 
  Image as ImageIcon, 
  AlertTriangle, 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  Heading1, 
  Heading2, 
  Heading3, 
  Link as LinkIcon, 
  Unlink 
} from "lucide-react";
import { useCreateBlogMutation, useUpdateBlogMutation, useGetBlogsAdminQuery, useDeleteBlogMutation } from '@/app/api/blogApiSlice';
import { Link as RouterLink } from 'react-router-dom';

// Tiptap Imports - Fixed naming conflicts
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';

// Constants 
// 🚨 FIX APPLIED: Removed "Driver Behavior Monitoring" as it was causing the backend enum validation error.
const CATEGORIES = [
  "Real-Time GPS Tracking",
  "Fleet Management System",
  "Vehicle Tracking Solution",
  "Route Optimization",
  // "Driver Behavior Monitoring", // ❌ Removed: Caused the submission error
  "Geofencing Alerts",
  "Fuel Usage Tracking",
  "Trip & Distance Reports",
  "Asset & Equipment Tracking",
  "Live Location Sharing"
];

const STATUS_OPTIONS = ['draft', 'published', 'archived'];

// Initial State Definitions 
const initialBlogState = {
    title: '',
    excerpt: '',
    content: '',
    author: 'Verify EKYC Team',
    category: '',
    tags: [],
    status: 'published',
    metaTitle: '',
    metaDescription: '',
};

const initialImageState = {
    featuredImage: null,
};

// ✅ PERFECT Tiptap Rich Text Editor Component
// ✅ ADVANCED & REFINED Tiptap Rich Text Editor Component
const RichTextEditor = ({ value, onChange }) => {
    const [linkUrl, setLinkUrl] = useState('');
    const [showLinkInput, setShowLinkInput] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
                // Removed default margins for tighter control
                paragraph: {
                    HTMLAttributes: {
                        class: 'm-0 p-0',
                    },
                },
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                HTMLAttributes: {
                    class: 'text-blue-600 underline hover:text-blue-800 cursor-pointer',
                },
            }),
            Image.configure({
                inline: false, // Make images block-level for better layout control
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto my-4', // Added margin for spacing
                },
            }),
            Placeholder.configure({
                placeholder: 'Start writing your amazing blog content here...',
            }),
            CharacterCount,
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        // IMPORTANT: Removed 'prose' classes to control spacing manually
        editorProps: {
            attributes: {
                class: 'focus:outline-none min-h-[300px]',
            },
        },
    });

    // Syncs external state changes back into the editor
    useEffect(() => {
        if (editor && !editor.isDestroyed && value !== editor.getHTML()) {
            // Use 'replace' to avoid polluting the history stack on external updates
            editor.commands.setContent(value, false);
        }
    }, [value, editor]);

    const addImage = () => {
        const url = window.prompt('Enter image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    // Callback to handle setting or updating a link
    const handleSetLink = () => {
        // If the input is empty, unset the link
        if (!linkUrl) {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            setShowLinkInput(false);
            return;
        }

        // Otherwise, set or update the link
        editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl, target: '_blank' }).run();
        setShowLinkInput(false);
        setLinkUrl('');
    };

    // Toggles the link input popover
    const toggleLinkInput = () => {
        if (editor.isActive('link')) {
            const currentUrl = editor.getAttributes('link').href;
            setLinkUrl(currentUrl);
        }
        setShowLinkInput(!showLinkInput);
    };


    if (!editor) {
        return (
            <div className="border border-gray-300 rounded-lg bg-white min-h-[300px] p-4 flex items-center justify-center">
                <p className="text-gray-500">Loading editor...</p>
            </div>
        );
    }

    return (
        <div className="border border-gray-300 rounded-lg bg-white overflow-hidden">
            {/* --- ADVANCED TOOLBAR --- */}
            <div className="border-b border-gray-200 bg-gray-50 p-2 flex flex-wrap items-center gap-1 relative">
                {/* History Group */}
                <div className="flex items-center border-r border-gray-200 pr-2 mr-2">
                    <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="p-2 rounded hover:bg-gray-200 disabled:opacity-40" title="Undo"><Undo className="w-4 h-4" /></button>
                    <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="p-2 rounded hover:bg-gray-200 disabled:opacity-40" title="Redo"><Redo className="w-4 h-4" /></button>
                </div>

                {/* Text Formatting Group */}
                <div className="flex items-center border-r border-gray-200 pr-2 mr-2">
                    <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded ${editor.isActive('bold') ? 'bg-slate-200' : 'hover:bg-gray-200'}`} title="Bold"><Bold className="w-4 h-4" /></button>
                    <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded ${editor.isActive('italic') ? 'bg-slate-200' : 'hover:bg-gray-200'}`} title="Italic"><Italic className="w-4 h-4" /></button>
                    <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded ${editor.isActive('underline') ? 'bg-slate-200' : 'hover:bg-gray-200'}`} title="Underline"><UnderlineIcon className="w-4 h-4" /></button>
                    <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-2 rounded ${editor.isActive('strike') ? 'bg-slate-200' : 'hover:bg-gray-200'}`} title="Strikethrough"><Strikethrough className="w-4 h-4" /></button>
                </div>

                {/* Headings Group */}
                <div className="flex items-center border-r border-gray-200 pr-2 mr-2">
                    <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-slate-200' : 'hover:bg-gray-200'}`} title="Heading 1"><Heading1 className="w-4 h-4" /></button>
                    <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-200' : 'hover:bg-gray-200'}`} title="Heading 2"><Heading2 className="w-4 h-4" /></button>
                    <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-slate-200' : 'hover:bg-gray-200'}`} title="Heading 3"><Heading3 className="w-4 h-4" /></button>
                </div>
                 {/* Lists & Quote Group */}
                 <div className="flex items-center border-r border-gray-200 pr-2 mr-2">
                    <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-slate-200' : 'hover:bg-gray-200'}`} title="Bullet List"><List className="w-4 h-4" /></button>
                    <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-slate-200' : 'hover:bg-gray-200'}`} title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
                    <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-slate-200' : 'hover:bg-gray-200'}`} title="Blockquote"><Quote className="w-4 h-4" /></button>
                </div>

                {/* Alignment Group */}
                <div className="flex items-center border-r border-gray-200 pr-2 mr-2">
                    <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`p-2 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-slate-200' : 'hover:bg-gray-200'}`} title="Align Left"><AlignLeft className="w-4 h-4" /></button>
                    <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`p-2 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-slate-200' : 'hover:bg-gray-200'}`} title="Align Center"><AlignCenter className="w-4 h-4" /></button>
                    <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`p-2 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-slate-200' : 'hover:bg-gray-200'}`} title="Align Right"><AlignRight className="w-4 h-4" /></button>
                </div>

                 {/* Links & Image Group */}
                 <div className="flex items-center">
                    <button type="button" onClick={toggleLinkInput} className={`p-2 rounded ${editor.isActive('link') ? 'bg-slate-200' : 'hover:bg-gray-200'}`} title="Add Link"><LinkIcon className="w-4 h-4" /></button>
                    <button type="button" onClick={addImage} className="p-2 rounded hover:bg-gray-200" title="Add Image"><ImageIcon className="w-4 h-4" /></button>
                </div>

                {/* Link Input Popover */}
                {showLinkInput && (
                    <div className="absolute top-full left-2 mt-1 z-10 bg-white border border-gray-300 rounded-lg shadow-lg p-2 flex items-center gap-2">
                        <Input type="text" placeholder="https://example.com" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} className="h-8 text-sm" autoFocus onKeyDown={(e) => { if (e.key === 'Enter') {e.preventDefault(); handleSetLink();} }}/>
                        <Button type="button" onClick={handleSetLink} size="sm" className="h-8 bg-[#1987BF] hover:bg-blue-700">Set Link</Button>
                    </div>
                )}
            </div>

            {/* --- EDITOR CONTENT --- */}
            <div className="min-h-[300px] max-h-[500px] overflow-y-auto p-4">
                <EditorContent editor={editor} />
            </div>

            {/* --- CHARACTER COUNT FOOTER --- */}
            <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-500 flex justify-end items-center gap-4">
                <span>{editor.storage.characterCount.words()} words</span>
                <span>{editor.storage.characterCount.characters()} characters</span>
            </div>
        </div>
    );
};


// Image Input Component 
const ImageInput = ({ label, fieldName, preview, onChange, currentImage }) => (
    <div className="space-y-2">
        <Label htmlFor={fieldName}>{label}</Label>
        <div className="flex items-center gap-4">
            <div className="w-32 h-20 bg-slate-100 rounded-md flex items-center justify-center border-2 border-dashed">
                {preview ? <img src={preview} alt={`${label} preview`} className="w-full h-full object-cover rounded-md" /> : currentImage ? <img src={currentImage} alt="Current" className="w-full h-full object-cover rounded-md" /> : <ImageIcon className="w-8 h-8 text-slate-400" />}
            </div>
            <Input id={fieldName} type="file" accept="image/*" onChange={(e) => onChange(e, fieldName)} className="flex-1" />
        </div>
    </div>
);

// Error Dialog Component 
const ErrorDialog = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" aria-modal="true" role="dialog">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0">
                            <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div className="mt-0 text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Submission Error
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-600">
                                    {message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-6 py-3 text-right">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default function BlogMetaDataForm() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [formData, setFormData] = useState(initialBlogState);
    const [imageFiles, setImageFiles] = useState(initialImageState);
    const [imagePreviews, setImagePreviews] = useState(initialImageState);
    const [tagInput, setTagInput] = useState('');
    const [errorDialog, setErrorDialog] = useState({ isOpen: false, message: '' });

    const { data: blogsResponse, isLoading: blogsLoading, refetch } = useGetBlogsAdminQuery();
    const [createBlog, { isLoading: createLoading }] = useCreateBlogMutation();
    const [updateBlog, { isLoading: updateLoading }] = useUpdateBlogMutation();
    const [deleteBlog] = useDeleteBlogMutation();
    const blogs = blogsResponse?.data || [];

    useEffect(() => {
        if (isFormVisible) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }, [isFormVisible])

    useEffect(() => {
    const handleBeforeUnload = (e) => {
        if (isFormVisible) {
            e.preventDefault();
            e.returnValue = '';
        }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
}, [isFormVisible]);
    const resetForm = () => {
        setIsFormVisible(false);
        setEditingBlog(null);
        setFormData(initialBlogState);
        setImageFiles(initialImageState);
        setImagePreviews(initialImageState);
        setTagInput('');
        setErrorDialog({ isOpen: false, message: '' });
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setImageFiles(prev => ({ ...prev, [fieldName]: file }));
            const reader = new FileReader();
            reader.onloadend = () => setImagePreviews(prev => ({ ...prev, [fieldName]: reader.result }));
            reader.readAsDataURL(file);
        }
    };

    const handleAddTag = () => {
        if (tagInput && !formData.tags.includes(tagInput)) {
            handleChange('tags', [...formData.tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        handleChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        // Ensure tags is an array to prevent errors
        const populatedState = {
            ...initialBlogState,
            ...blog,
            tags: Array.isArray(blog.tags) ? blog.tags : [],
        };
        setFormData(populatedState);
        setImagePreviews({ featuredImage: blog.featuredImage?.url || null });
        setImageFiles(initialImageState);
        setIsFormVisible(true);
    };

    const handleDelete = async (blogId) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            await deleteBlog(blogId).unwrap();
            refetch();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clean up the HTML content
        const finalContent = formData.content
            .replace(/<p><\/p>/g, '') // Remove empty paragraphs
            .replace(/\s+/g, ' ') // Normalize whitespace
            .trim();

        const formDataToSend = new FormData();
        formDataToSend.append('blogData', JSON.stringify({
            ...formData,
            content: finalContent
        }));

        if (imageFiles.featuredImage) {
            formDataToSend.append('featuredImage', imageFiles.featuredImage);
        }


        try {
            if (editingBlog) {
                await updateBlog({ id: editingBlog._id, formData: formDataToSend }).unwrap();
            } else {
                await createBlog(formDataToSend).unwrap();
            }
             alert('Blog post saved successfully!');
        

            resetForm();
            refetch();
        } catch (error) {
            console.error("Failed to save blog post:", error);
            setErrorDialog({
                isOpen: true,
                message: error.data?.message || 'An unknown server error occurred. Please try again.'
            });
        }
    };

    return (
        <>
            {/* Global blog content display styles */}

<style jsx global>{`
    /* --- CUSTOM TIP TAP EDITOR STYLES --- */
    
    /* Main editor container */
    .ProseMirror {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 16px;
        line-height: 1.6; /* Standard line height for readability */
        color: #374151; /* Dark gray for text */
    }

    /* Remove focus outline */
    .ProseMirror:focus {
        outline: none;
    }

    /* Control spacing for paragraphs */
    .ProseMirror p {
        margin-top: 0;
        margin-bottom: 1em; /* Standard single-line space after a paragraph */
    }

    /* Spacing and styling for headings */
    .ProseMirror h1, .ProseMirror h2, .ProseMirror h3 {
        margin-top: 1.5em; /* More space before a heading */
        margin-bottom: 0.5em; /* Less space after a heading */
        line-height: 1.2;
        font-weight: 600;
        color: #1f2937;
    }

    .ProseMirror h1 { font-size: 1.75em; }
    .ProseMirror h2 { font-size: 1.35em; }
    .ProseMirror h3 { font-size: 1.15em; }

    /* Spacing for lists */
    .ProseMirror ul, .ProseMirror ol {
        margin-bottom: 1em;
        padding-left: 24px;
    }

    .ProseMirror li {
        margin-bottom: 0.4em;
    }
    
    /* Styling for blockquotes */
    .ProseMirror blockquote {
        border-left: 3px solid #d1d5db; /* Gray border */
        padding-left: 1rem;
        margin: 1.5em 0;
        font-style: italic;
        color: #6b7280; /* Muted text color */
    }
    
    /* Placeholder text style */
    .ProseMirror p.is-editor-empty:first-child::before {
      content: attr(data-placeholder);
      float: left;
      color: #adb5bd;
      pointer-events: none;
      height: 0;
    }
`}</style>

            <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 bg-slate-50 min-h-screen">
                <ErrorDialog
                    isOpen={errorDialog.isOpen}
                    message={errorDialog.message}
                    onClose={() => setErrorDialog({ isOpen: false, message: '' })}
                />

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Blog Manager</h1>
                        <p className="text-slate-600 mt-1">Create, edit, and manage all your blog content.</p>
                    </div>
                    {!isFormVisible && (
                        <Button onClick={() => setIsFormVisible(true)} className="bg-[#1987BF] hover:bg-blue-700 text-white shadow-sm">
                            <Plus className="w-4 h-4 mr-2" /> Create New Post
                        </Button>
                    )}
                </div>

                {isFormVisible && (
                    <Card className="mb-8 shadow-lg border-slate-200">
                        <div className="p-4 bg-white rounded-t-lg flex items-center justify-between border-b">
                            <CardTitle className="text-xl text-slate-800">{editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
                            <Button variant="ghost" size="icon" onClick={resetForm}><X className="w-5 h-5" /></Button>
                        </div>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6 p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div><Label className="my-2">Title</Label><Input value={formData.title} onChange={e => handleChange('title', e.target.value)} required /></div>
                                    <div><Label className="my-2" >Author</Label><Input value={formData.author} onChange={e => handleChange('author', e.target.value)} required /></div>
                                    <div><Label className="my-2" >Category</Label><Select value={formData.category} onValueChange={v => handleChange('category', v)} required><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger><SelectContent className="bg-white">{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
                                    <div>
                                        <Label className="my-2">Status</Label>
                                        <Select value={formData.status} onValueChange={v => handleChange('status', v)} required>
                                            <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                                            <SelectContent className="bg-white">{STATUS_OPTIONS.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}</SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div><Label className="my-2">Excerpt (Short summary for cards)</Label><Textarea className="border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" value={formData.excerpt} onChange={e => handleChange('excerpt', e.target.value)} required /></div>
                                <div className="relative">
                                    <Label className="my-2">Content</Label>
                                    <RichTextEditor value={formData.content} onChange={value => handleChange('content', value)} />
                                </div>
                                <div>
                                    <Label className="my-2">Tags</Label>
                                    <div className="flex items-center gap-2">
                                        <Input value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder="Add a tag and press enter" onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())} />
                                        <Button type="button" onClick={handleAddTag}>Add</Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                                {tag}
                                                <button type="button" onClick={() => handleRemoveTag(tag)}><X className="w-3 h-3" /></button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-lg">SEO</h3>
                                        <div><Label className="my-2">Meta Title</Label><Input value={formData.metaTitle} onChange={e => handleChange('metaTitle', e.target.value)} /></div>
                                        <div><Label className="my-2">Meta Description</Label><Textarea className="border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" value={formData.metaDescription} onChange={e => handleChange('metaDescription', e.target.value)} /></div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-lg">Images</h3>
                                        <ImageInput label="Featured Image" fieldName="featuredImage" preview={imagePreviews.featuredImage} onChange={handleImageChange} currentImage={editingBlog?.featuredImage?.url} />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 pt-6">
                                    <Button type="button" variant="ghost" onClick={resetForm}>Cancel</Button>
                                    <Button type="submit" disabled={createLoading || updateLoading} className="bg-[#1987BF] hover:bg-blue-700 text-white shadow-sm w-40">
                                        {(createLoading || updateLoading) ? 'Saving...' : 'Save Post'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Existing Blog Posts Table */}
                <Card className="shadow-md border-slate-200">
                    <CardHeader><CardTitle className="my-4">Existing Blog Posts</CardTitle></CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-slate-500">
                                <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Title</th>
                                        <th scope="col" className="px-6 py-3">Category</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                        <th scope="col" className="px-6 py-3">Last Updated</th>
                                        <th scope="col" className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogsLoading ? (
                                        <tr><td colSpan="5" className="text-center p-6">Loading posts...</td></tr>
                                    ) : blogs.map(blog => (
                                        <tr key={blog._id} className="bg-white border-b hover:bg-slate-50">
                                            <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{blog.title}</th>
                                            <td className="px-6 py-4"><Badge variant="secondary">{blog.category}</Badge></td>
                                            <td className="px-6 py-4"><Badge variant={blog.status === 'published' ? 'default' : 'outline'}>{blog.status}</Badge></td>
                                            <td className="px-6 py-4">{new Date(blog.updatedAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end items-center">
                                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(blog)} className="text-slate-500 hover:text-[#1987BF]"><Edit className="w-4 h-4" /></Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(blog._id)} className="text-slate-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button>
                                                    <RouterLink to={`/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer">
                                                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-green-600"><Eye className="w-4 h-4" /></Button>
                                                    </RouterLink>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}