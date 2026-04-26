import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthStore } from '@realworld/auth/data-access';
import { ProfileStore } from '@realworld/profile/data-access';
import { ArticlesListStore } from '@realworld/articles/data-access';
import { AvatarComponent, IconComponent } from '@realworld/ui/components';

@Component({
  selector: 'cdt-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [RouterModule, NgClass, AvatarComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private readonly profileStore = inject(ProfileStore);
  private readonly authStore = inject(AuthStore);
  private readonly articlesListStore = inject(ArticlesListStore);

  $profileLoading = this.profileStore.getProfileLoading;
  $username = this.profileStore.username;
  $image = this.profileStore.image;
  $bio = this.profileStore.bio;
  $following = this.profileStore.following;
  $currentUser = this.authStore.user.username;

  $isUser = computed(() => this.$currentUser() === this.$username());

  /**
   * Articles count scoped to the currently-loaded feed (either "My Articles"
   * or "Favorited"). The API returns articlesCount for the active filter, so
   * this reflects the tab the user is on.
   */
  $articlesCount = computed(() => this.articlesListStore.articles.articlesCount());

  toggleFollowing() {
    if (this.$following()) {
      this.profileStore.unfollowUser(this.$username);
    } else {
      this.profileStore.followUser(this.$username);
    }
  }
}
