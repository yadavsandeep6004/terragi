import classNames from "classnames";
import React from "react";
import { FontType, Text, ColorType } from "../../components/text";
import styles from "./privacypolicypage.module.scss";

const PrivacyPolicyPage = () =>{
    return (
        <div
            style={{
                width: "80%",
                margin: "auto",
                paddingTop: "10px",
                paddingBottom: "50px",
            }}
            className={styles.container}
        >
            <Text
                font={FontType.HEADING_L}
                weight={400}
                style={{ textAlign: "center", paddingBottom: "10px" }}
            >
                Privacy and Policy
            </Text>

            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                This privacy policy ("Policy") explains the policy regarding the
                collection, use, disclosure and transfer of your information by
                Terragi Tech Solutions Pvt Limited and/or its subsidiary(ies)
                and/or affiliate(s) (collectively referred to as the "Company"),
                which operates various websites, including sub-sites, platforms,
                applications, m-web platforms and other platforms (collectively
                referred to as "Sites") for delivery of information, products,
                offerings and content via any mobile or internet connected
                device or otherwise (collectively the "Services").
            </Text>

            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                This Policy forms part and parcel of the Terms of Use and other
                terms on the Site ("Terms of Use"). Capitalized terms which have
                been used here but are undefined shall have the same meaning as
                attributed to them in the Terms of Use. This policy is effective
                from the date and time a user registers with Site and accepts
                the terms and conditions laid out in the Site. Please read this
                Privacy Policy and our Terms of Use carefully before using our
                Services.
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                Terragi respects the privacy of its users and is committed to
                protect it in all respects. With a view to offer the most
                enriching and holistic internet experience to its users Terragi
                offers a vast repository of Online Sites and a variety of
                community services. The information about the user as collected
                by Terragi is: (a) information supplied by users and (b)
                information automatically tracked while navigation
                (Information).
            </Text>
            <Text
                style={{ paddingBottom: "20px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                By using Terragi website or its services, you consent to
                collection, storage, use, transfer, share and distribute the
                personal information you provide (including any changes thereto
                as provided by you) for any of the services that we offer.
            </Text>
            <Text
                style={{ paddingBottom: "20px" }}
                font={FontType.SUBHEADING_L}
                color={ColorType.BLACK}
                weight={"bold"}
            >
                Information Received, Collected And Stored by The Company
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.HEADING_S}
                color={ColorType.BLACK}
                weight={"bold"}
            >
                A. Information Supplied By Users
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.SUBHEADING_L}
                color={ColorType.BLACK}
                weight={"bold"}
            >
                Registration data
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                When you register on the Sites for the Service, we ask you to
                provide basic contact information such as your name, sex, age,
                address, pin code, contact number, occupation, interests and
                email address etc. When you register using your other accounts
                like Facebook, Twitter, Gmail etc. we shall retrieve Information
                from such accounts to continue to interact with you and to
                continue providing the Services.
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.SUBHEADING_L}
                color={ColorType.BLACK}
                weight={"bold"}
            >
                Subscription or paid service data
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                When you choose any subscription or paid service provided as
                part of our Services, we or our payment gateway provider may
                collect your purchase, address or billing information, including
                your credit card number and expiration date etc. However, when
                you order using an in-app purchase option on any of the
                applications of the Company, same are handled by such mobile
                operating system platform providers. The subscriptions or paid
                Services may be on auto renewal mode unless cancelled. If at any
                point you do not wish to auto-renew your subscription, you may
                cancel your subscription before the end of the subscription
                term.
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.SUBHEADING_L}
                color={ColorType.BLACK}
                weight={"bold"}
            >
                Voluntary information
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                We may collect additional information at other times, including
                but not limited to, when you provide feedback, comments, change
                your content or email preferences, respond to a survey, or any
                communications with us.
            </Text>
            <Text
                style={{ paddingBottom: "20px" }}
                font={FontType.SUBHEADING_L}
                color={ColorType.BLACK}
                weight={"bold"}
            >
                Information Automatically Collected/ Tracked While Navigation
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.SUBHEADING_L}
                color={ColorType.BLACK}
                weight={"bold"}
            >
                Cookies
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                To improve the responsiveness of the Sites for our Users, we may
                use "cookies", or similar electronic tools to collect
                Information to assign each visitor a unique, random number as a
                User Identification (User ID) to understand the User's
                individual interests using the identified computer or device.
                Unless you voluntarily identify yourself (through registration,
                for example), we will have no way of knowing who you are, even
                if we assign a cookie to your computer or device. The only
                personal information a cookie can contain is information you
                supply. A cookie cannot read data off your hard drive or device.
                Our advertisers may also assign their own cookies to your
                browser (if you click on their ads etc.), a process that we do
                not control. We receive and store certain types of Information
                whenever you interact with us via Site or Service though your
                computer/laptop/netbook or mobile/tablet/pad/handheld device
                etc.
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.SUBHEADING_L}
                color={ColorType.BLACK}
                weight={"bold"}
            >
                Opting out
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                If a User opts out using the Ads Settings, the unique
                DoubleClick cookie ID on the User's browser is overwritten with
                the phrase "OPT_OUT". Because there is no longer a unique cookie
                ID, the opt-out cookie can't be associated with a particular
                browser.
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.SUBHEADING_L}
                color={ColorType.BLACK}
                weight={"bold"}
            >
                Log File Information
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                We automatically collect limited information about your
                computer's connection to the Internet, mobile number, including
                your IP address, when you visit our site, application or
                service. Your IP address is a number that lets computers
                attached to the Internet know where to send you data -- such as
                the pages you view. We automatically receive and log information
                from your browser, including your IP address, your computer's
                name, your operating system, browser type and version, CPU
                speed, and connection speed. We may also collect log information
                from your device, including your location, IP address, your
                device's name, device's serial number or unique identification
                number (e.g. UDiD on your iOS device), your device operating
                system, browser type and version, CPU speed, and connection
                speed etc.
            </Text>
            <Text
                style={{ paddingBottom: "20px" }}
                font={FontType.SUBHEADING_L}
                color={ColorType.BLACK}
                weight={"bold"}
            >
                Information from other sources
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                We may receive information about you from other sources, add it
                to our account information and treat it in accordance with this
                Policy. If you provide information to the platform provider or
                other partner, whom we provide services to, your account
                information and order information may be passed on to us.
            </Text>
            <Text
                style={{ paddingBottom: "20px" }}
                font={FontType.SUBHEADING_L}
                color={ColorType.BLACK}
                weight={"bold"}
            >
                Demographic and other information
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                We may reference other sources of demographic and other
                information in order to provide you with more targeted
                communications and promotions. We use Google Analytics, among
                others, to track the user behaviour on our Sites. Google
                Analytics specifically has been enabled to support display
                advertising towards helping us gain understanding of our users'
                demographics and interests. The reports are anonymous and cannot
                be associated with any individual personally identifiable
                information that you may have shared with us. You can opt-out of
                Google Analytics for display advertising and customize Google
                Display Network ads using the Ads Settings options provided by
                Google.
            </Text>
            <Text
                style={{ paddingBottom: "20px" }}
                font={FontType.SUBHEADING_L}
                color={ColorType.BLACK}
                weight={"bold"}
            >
                LINKS TO THIRD PARTY SITES / AD-SERVERS
            </Text>
            <Text
                style={{ paddingBottom: "7px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                The Sites may include links to other websites or applications.
                Such websites or applications are governed by their respective
                privacy policies, which are beyond our control. Once you leave
                our servers (you can tell where you are by checking the URL in
                the location bar on your browser), use of any information you
                provide is governed by the privacy policy of the operator of the
                application, you are visiting. That privacy policy may differ
                from ours. If you can't find the privacy policy of any of these
                sites via a link from the application's homepage, you should
                contact the application owners directly for more information.
            </Text>
            <Text
                style={{ paddingBottom: "7px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                When we present Information to our advertisers -- to help them
                understand our audience and confirm the value of advertising on
                our Sites -- it is usually in the form of aggregated statistics
                on traffic to various pages / content within our Sites. We use
                third-party advertising companies to serve ads when you visit
                our Sites. These companies may use Information (excluding your
                name, address, email address or telephone number or other
                personally identifiable information) about your visits to this
                and other websites or application, in order to provide
                advertisements about goods and services of interest to you.
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                We do not provide any personally identifiable information to
                third party websites / advertisers / ad-servers without your
                consent.
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.SUBHEADING_L}
                color={ColorType.BLACK}
                weight={"bold"}
            >
                INFORMATION USED BY THE COMPANY
            </Text>
            <Text
                style={{ paddingBottom: "7px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                The information as supplied by the users enables us to improve
                the Services and provide you the most user-friendly experience.
                In some cases/provision of certain service(s) or utility (ies),
                we may require your contact address as well. All required
                Information is service dependent and the Company may use the
                above said user Information to, maintain, protect, and improve
                the Services (including advertising and personalisation on the
                Sites) and for developing new services. We may also use your
                email address or other personally identifiable information to
                send commercial or marketing messages about our Services and/or
                such additional updates and features about third parties
                products and services with an option to subscribe / unsubscribe
                (where feasible). We may, however, use your email address for
                non-marketing or administrative purposes (such as notifying you
                of major changes, for customer service purposes, billing, etc.).
            </Text>
            <Text
                style={{ paddingBottom: "7px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                Any personally identifiable information provided by you will not
                be considered as sensitive if it is freely available and / or
                accessible in the public domain like any comments, messages,
                blogs, scribbles available on social platforms like Facebook,
                twitter etc.
            </Text>
            <Text
                style={{ paddingBottom: "7px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                Any posted/uploaded/conveyed/communicated by users on the public
                sections of the Sites becomes published content and is not
                considered personally identifiable information subject to this
                Policy.
            </Text>
            <Text
                style={{ paddingBottom: "7px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                In case you choose to decline to submit personally identifiable
                information on the Sites, we may not be able to provide certain
                services on the Sites to you. We will make reasonable efforts to
                notify you of the same at the time of opening your account. In
                any case, we will not be liable and or responsible for the
                denial of certain services to you for lack of you providing the
                necessary personal information.
            </Text>
            <Text
                style={{ paddingBottom: "20px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                When you register with the Sites or Services, we contact you
                from time to time about updating your personal information to
                provide the Users such features that we believe may benefit /
                interest you.
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.TITLE}
                color={ColorType.BLACK}
            >
                How collected data is used?
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                We use third-party advertising companies to serve ads when you
                visit or use our Sites or Services. These companies may use
                information (excluding your name, address, email address or
                telephone number or any personally identifiable information)
                about your visits or use to particular websites, mobile
                applications or services, in order to provide advertisements
                about goods and services of interest to you. Terragi also allows
                advertisers and creators to serve advertisements directly, using
                Terragi's Tech Solutions Pvt Ltd own ad serving technologies.
            </Text>
            <Text
                style={{ paddingBottom: "20px" }}
                font={FontType.SUBHEADING_L}
                color={ColorType.BLACK}
                weight={"bold"}
            >
                Information Sharing
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
            >
                Personal information will be used to allow you to login to your
                account on Site or to resolve specific service issues, inform
                you of our new services or features and to communicate with you
                in relation to your use of the Site. Any other information
                collected will be used for- business purposes and this may
                include User's viewing or advertising of residential or
                commercial real estate, rental properties or use of associated
                services; analytical purposes, data usage; improving the Site,
                or user experience; and providing targeted advertisements to
                you.
            </Text>
            <Text
                style={{ paddingBottom: "10px" }}
                font={FontType.HEADING_S}
                color={ColorType.BLACK}
                weight={"bold"}
            >
                The Company shares your Information with any third party without
                obtaining the prior consent of the User in the following limited
                circumstances
            </Text>
            <div style={{ marginLeft: "50px", color: "black" }}>
                <Text
                    style={{ paddingBottom: "10px" }}
                    font={FontType.BODY}
                    color={ColorType.BLACK}
                >
                    Personal information will be used to allow you to login to
                    your account on Site or to resolve specific service issues,
                    inform you of our new services or features and to
                    communicate with you in relation to your use of the Site.
                    Any other information collected will be used for- business
                    purposes and this may include User's viewing or advertising
                    of residential or commercial real estate, rental properties
                    or use of associated services; analytical purposes, data
                    usage; improving the Site, or user experience; and providing
                    targeted advertisements to you.
                    <br />
                    The Company proposes to share such Information to conduct
                    its business and to share such Information within its group
                    companies and officers and employees of such group companies
                    for the purpose of processing personal information on its
                    behalf. We also ensure that these recipients of such
                    Information agree to process such information based on our
                    instructions and in compliance with this Policy and any
                    other appropriate confidentiality and security measures.
                    <br />
                    The Company may present Information to our advertisers and
                    third parties - to help them understand our audience and
                    confirm the value of advertising on our Sites - however it
                    is usually in the form of aggregated statistics on traffic
                    to various pages within our site.
                    <br />
                    The Company may share your Information regarding your
                    activities on Sites with third party social websites to
                    populate your social wall that is visible to other people
                    however you will have an option to set your privacy
                    settings, where you can decide what you would like to share
                    or not to share with others.
                    <br />
                    We may share your Information to enforce or protect our
                    rights or any or all of its affiliates, associates,
                    employees, directors or officers or when we have reason to
                    believe that disclosing Information of User(s) is necessary
                    to identify, contact or bring legal action against someone
                    who may be causing interference with our rights or our
                    Sites, whether intentionally or otherwise, or when anyone
                    else could be harmed by such activities.
                    <br />
                    Your E-mail address is made available to other organisations
                    whose products or services we think you might find
                    interesting.
                    <br />
                    Registered telephone numbers of customers coming on our site
                    may receive telephone or text message contact from us with
                    information regarding new products and services or upcoming
                    events.
                </Text>
                <Text
                    style={{ paddingBottom: "20px" }}
                    font={FontType.BODY}
                    color={ColorType.BLACK}
                >
                    - Accessing and Updating Personal Information
                </Text>
                <Text
                    style={{ paddingBottom: "20px" }}
                    font={FontType.BODY}
                    color={ColorType.BLACK}
                >
                    When you use the Services or Sites (or any of its sub
                    sites), we make good faith efforts to provide you, as and
                    when requested by you, with access to your personal
                    information and shall further ensure that any personal
                    information or sensitive personal data or information found
                    to be inaccurate or deficient shall be corrected or amended
                    as feasible, subject to any requirement for such personal
                    information or sensitive personal data or information to be
                    retained by law or for legitimate business purposes. We ask
                    individual users to identify themselves and the information
                    requested to be accessed, corrected or removed before
                    processing such requests, and we may decline to process
                    requests that are unreasonably repetitive or systematic,
                    require disproportionate technical effort, jeopardize the
                    privacy of others, or would be extremely impractical (for
                    instance, requests concerning information residing on backup
                    tapes), or for which access is not otherwise required. In
                    any case, where we provide information access and
                    correction, we perform this service free of charge, except
                    if doing so would require a disproportionate effort. Because
                    of the way we maintain certain services, after you delete
                    your information, residual copies may take a period of time
                    before they are deleted from our active servers and may
                    remain in our backup systems.
                </Text>
                <Text
                    style={{ paddingBottom: "20px" }}
                    font={FontType.BODY}
                    color={ColorType.BLACK}
                >
                    - Information Security
                </Text>
                <Text
                    style={{ paddingBottom: "10px" }}
                    font={FontType.BODY}
                    color={ColorType.BLACK}
                >
                    We take appropriate security measures to protect against
                    unauthorized access to or unauthorized alteration,
                    disclosure or destruction of data. These include internal
                    reviews of our data collection, storage and processing
                    practices and security measures, including appropriate
                    encryption and physical security measures to guard against
                    unauthorized access to systems where we store personal data.
                    All information gathered on TIL is securely stored within
                    the Company controlled database. The database is stored on
                    servers secured behind a firewall; access to the servers is
                    password-protected and is strictly limited. However, as
                    effective as our security measures are, no security system
                    is impenetrable. We cannot guarantee the security of our
                    database, nor can we guarantee that information you supply
                    will not be intercepted while being transmitted to us over
                    the Internet. And, of course, any information you include in
                    a posting to the discussion areas is available to anyone
                    with Internet access.
                </Text>
                <Text
                    style={{ paddingBottom: "20px" }}
                    font={FontType.BODY}
                    color={ColorType.BLACK}
                >
                    We use third-party advertising companies to serve ads when
                    you visit or use our Sites or Services. These companies may
                    use information (excluding your name, address, email address
                    or telephone number or any personally identifiable
                    information) about your visits or use to particular
                    websites, mobile applications or services, in order to
                    provide advertisements about goods and services of interest
                    to you.
                </Text>
                <Text
                    style={{ paddingBottom: "10px" }}
                    font={FontType.SUBHEADING_M}
                    color={ColorType.BLACK}
                    weight={"bold"}
                >
                    Updates / Changes
                </Text>
                <Text
                    style={{ paddingBottom: "20px" }}
                    font={FontType.BODY}
                    color={ColorType.BLACK}
                >
                    The internet is an ever evolving medium. We may alter our
                    Policy from time to time to incorporate necessary changes in
                    technology, applicable law or any other variant. In any
                    case, we reserve the right to change (at any point of time)
                    the terms of this Policy or the Terms of Use. Any changes we
                    make will be effective immediately on notice, which we may
                    give by posting the new policy on the Sites. Your use of the
                    Sites or Services after such notice will be deemed
                    acceptance of such changes. We may also make reasonable
                    efforts to inform you via electronic mail. In any case, you
                    are advised to review this Policy periodically on the Sites
                    to ensure that you are aware of the latest version.
                </Text>
                <Text
                    style={{ paddingBottom: "10px" }}
                    font={FontType.SUBHEADING_L}
                    color={ColorType.BLACK}
                    weight={"bold"}
                >
                    Security
                </Text>
                <Text
                    style={{ paddingBottom: "10px" }}
                    font={FontType.BODY}
                    color={ColorType.BLACK}
                >
                    We use commercially reasonable security measures to protect
                    the loss, misuse, and alteration of the information under
                    our control. However, we cannot absolutely guarantee the
                    protection of any information shared with us.
                </Text>
                <Text
                    style={{ paddingBottom: "10px" }}
                    font={FontType.SUBHEADING_L}
                    color={ColorType.BLACK}
                    weight={"bold"}
                >
                    Accuracy and Confidentiality of Account Information
                </Text>
                <Text
                    style={{ paddingBottom: "10px" }}
                    font={FontType.BODY}
                    color={ColorType.BLACK}
                >
                    Customers are responsible for maintaining the secrecy and
                    accuracy of password, email address, and other account
                    information at all times. Company is not responsible for any
                    personal data transmitted to a third party as a result of an
                    incorrect account related information.
                </Text>
                <Text
                    style={{ paddingBottom: "10px" }}
                    font={FontType.SUBHEADING_L}
                    color={ColorType.BLACK}
                    weight={"bold"}
                >
                    Third-Party Websites
                </Text>
                <Text
                    style={{ paddingBottom: "10px" }}
                    font={FontType.BODY}
                    color={ColorType.BLACK}
                >
                    Our Site may contain links to third party websites.
                    Navigating to another website does not make the Company
                    liable for misuse of any information by any website
                    controller to which we may link. Also there shall be
                    websites that use our Terragi.in search function and the
                    Company is not liable for content on such websites.
                </Text>
                <Text
                    style={{ paddingBottom: "10px" }}
                    font={FontType.SUBHEADING_L}
                    color={ColorType.BLACK}
                    weight={"bold"}
                >
                    Questions / Grievance Redressal
                </Text>
                <Text
                    style={{ paddingBottom: "10px" }}
                    font={FontType.BODY}
                    color={ColorType.BLACK}
                    className={styles.website}
                >
                    Redressal Mechanism: Any complaints, abuse or concerns with
                    regards to the use, processing and disclosure of Information
                    provided by you or breach of these terms should immediately
                    be informed to the designated Grievance Officers, the list
                    of respective grievance officers is being provided in Terms
                    of Use via in writing or through email signed with the
                    electronic signature to{" "}
                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=feedback@terragi.in"
                        className={styles.url}
                    >
                        feedback@terragi.in
                    </a>
                    or Mr. Kamal Verma ("Grievance Officer").
                </Text>
                <address className={styles.website}>
                    Mr. Kamal Verma (Grievance Officer)
                    <br />
                    <a
                        href="https://terragi.in/coming-soon"
                        className={styles.url}
                    >
                        www.terragi.in/
                    </a>
                    <br />
                    <br />
                    Terragi Tech Solutions Pvt Ltd <br />
                    C 1511 / Sushant Lok 1<br />
                    Gurgaon , Haryana - 122001
                    <br />
                    Email:
                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=feedback@terragi.in"
                        className={styles.url}
                    >
                        feedback@terragi.in
                    </a>
                    <br />
                    Ph:
                    <a href="tel:9599254826" className={styles.url}>
                        9599254826
                    </a>
                    <br />
                    <br />
                </address>
                <Text
                    style={{ paddingBottom: "10px" }}
                    font={FontType.BODY}
                    color={ColorType.BLACK}
                >
                    This Privacy Policy is subject to changes. Please
                    periodically review this page for the latest information on
                    our privacy practices.
                </Text>
            </div>
        </div>
    );
}

export default PrivacyPolicyPage