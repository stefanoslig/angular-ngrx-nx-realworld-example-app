import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthStore } from '@realworld/auth/data-access';
import { ProfileStore } from '@realworld/profile/data-access';

@Component({
  selector: 'cdt-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [RouterModule, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private readonly profileStore = inject(ProfileStore);
  private readonly authStore = inject(AuthStore);

  $profileLoading = this.profileStore.getProfileLoading;
  $username = this.profileStore.username;
  $image = this.profileStore.image;
  $bio = this.profileStore.bio;
  $following = this.profileStore.following;
  $currentUser = this.authStore.user.username;

  $isUser = computed(() => this.$currentUser() === this.$username());

  toggleFollowing() {
    if (this.$following()) {
      this.profileStore.unfollowUser(this.$username);
    } else {
      this.profileStore.followUser(this.$username);
    }
  }
}
