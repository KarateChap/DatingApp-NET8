import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error) => {
      if (error) {
        const errorStatus = error.status;
        const errorMessage = error.error;

        switch (errorStatus) {
          case 400:
            const validationErrors = errorMessage.errors;

            if (validationErrors) {
              const modalStateErrors = [];
              for (const key in validationErrors) {
                if (validationErrors[key]) {
                  modalStateErrors.push(validationErrors[key]);
                }
              }
              throw modalStateErrors.flat();
            } else {
              toastr.error(errorMessage, errorStatus);
            }
            break;
          case 401:
            toastr.error('Unauthorised', errorStatus);
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras: NavigationExtras = {
              state: { error: errorMessage },
            };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            toastr.error('Something unexpected went wrong');
            break;
        }
      }
      throw error;
    })
  );
};
