
function send_verification_email() {
    $user_email = filter_input(INPUT_POST, 'log', FILTER_SANITIZE_EMAIL);

    if (!empty($user_email)) {
        $user = get_user_by('email', $user_email);

        if ($user) {
            $verification_code = wp_generate_password(32);
            update_user_meta($user->ID, 'verification_code', $verification_code);

            $email_subject = 'Verify your login for example.com';
            $email_message = 'Please click on the following link to verify your login: ' . home_url('/verify-login/') . '?email=' . urlencode($user_email) . '&code=' . urlencode($verification_code);
            $headers = array('Content-Type: text/html; charset=UTF-8');

            wp_mail($user_email, $email_subject, $email_message, $headers);

            wp_redirect(home_url('/verify-login/'));
            exit;
        }
    }
}

add_action('wp_authenticate_user', 'send_verification_email', 10, 2);
