type props = {
    ProfileAvatarUrl?: string
}


export default function Avatar(props: props) {

    const { ProfileAvatarUrl } = props

    return (
        <div className="rounded-full h-[128px] w-[128px] top-32 left-4 absolute border-4 border-black bg-gray-400 overflow-hidden flex justify-center items-center">
            <img
                src={ProfileAvatarUrl || "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"}
                className="h-full w-full object-cover" />
        </div>
    )
}