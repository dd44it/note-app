import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  toggleLike(id: string): boolean {
    const liked = this.isLiked(id);
    if (liked) {
      localStorage.removeItem('like_' + id);
      return false;
    } else {
      localStorage.setItem('like_' + id, '1');
      return true;
    }
  }

  isLiked(id: string): boolean {
    return !!localStorage.getItem('like_' + id);
  }
}
