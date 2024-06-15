import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse, NextRequest } from "next/server";
import { axiosInstance } from "@/utils/constants";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_KEY!,
  },
});

async function uploadToS3(file: any, fileName: any) {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
      Key: `${fileName}-${Date.now()}`,
      Body: buffer,
      ContentType: "image/*",
    };

    const command = new PutObjectCommand(params);

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    const data = await s3Client.send(command);

    return url.split("?")[0];
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const files = formData.getAll("images[]");

    if (!files || files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "file is required",
        },
        { status: 400 }
      );
    }

    const uploadedImage = [];

    for (let file of files) {
      if (file instanceof File) {
        const fileUrl = await uploadToS3(file, file.name);
        uploadedImage.push(fileUrl);
      }
    }

    // const cookie = request.cookies.get("token")?.value;

    // let { data } = await axiosInstance.put(
    //   "/api/auth/update-profile-image",
    //   { fileUrl },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${cookie}`,
    //     },
    //   }
    // );

    // console.log(data);

    // const user = {
    //   ...data.user,
    //   password: undefined,
    //   verifyToken: undefined,
    //   verifyTokenExpiry: undefined,
    // };
    // console.log(user);

    // if (data.success) {
    // return NextResponse.json({ success: true, user });
    // }

    console.log(uploadedImage);
    

    return NextResponse.json({ success: true, uploadedImage });

    // return NextResponse.json({ succes: false });
  } catch (error: any) {
    console.log("error in router", error.data.error);
    return NextResponse.json({ success: false });
  }
}
