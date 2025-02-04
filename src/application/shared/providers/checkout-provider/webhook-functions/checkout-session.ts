import { CourseStudentPaymentStatus } from '@/application/modules/course/entities/course-student';
import { CourseRepository } from '@/application/modules/course/repositories/course-repository';
import Stripe from 'stripe';

export function checkoutSessionUpdated(
  checkoutSession: Stripe.Checkout.Session,
  courseRepo: CourseRepository
) {
  return async () => {
    const courseStudent = await courseRepo.getCourseStudentByCheckoutSessionId(checkoutSession.id);

    if (!courseStudent) return;

    const status = checkoutSession.status;
    const paymentStatus = checkoutSession.payment_status;

    if (status === 'complete' && paymentStatus === 'paid') {
      courseStudent.paymentStatus = CourseStudentPaymentStatus.APPROVED;
      await courseRepo.changeCourseStudentsCount(courseStudent.id, 'INCREMENT');
    }

    // TODO: no futuro só gerar um link de checkout, para não expirar algo já pago
    // if (status === 'expired' && paymentStatus === 'unpaid') {
    //   courseStudent.paymentStatus = CourseStudentPaymentStatus.EXPIRED;
    // }


    await courseRepo.updateCourseStudentPaymentStatus(courseStudent);
  };
}
