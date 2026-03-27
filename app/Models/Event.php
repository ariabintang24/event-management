<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title',
        'description',
        'date',
        'location',
        'price',
        'quota',
        'image',
    ];

    protected $appends = ['image_url'];

    public function images()
    {
        return $this->hasMany(EventImage::class);
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function bookmarkedBy()
    {
        return $this->belongsToMany(User::class, 'bookmarks');
    }

    public function getImageUrlAttribute()
    {
        return $this->image
            ? asset('storage/' . $this->image)
            : null;
    }
}
